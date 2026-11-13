import { DataTypes, Sequelize, Transaction } from "sequelize";
import { sequelize } from "../../database/connection";
import { QueryTypes } from "sequelize";
import Tenant from "../../database/models/tenant.model";

interface TableInfo {
  tablename: string;
}

export class TenantService {
  static async getTenantByOwner(tenantOwner: string) {
    const tenant = await Tenant.findOne({
      attributes: ["id", "tenantCode", "tenantOwner"],
      where: { tenantOwner },
    });
    if (!tenant) {
      throw new Error("Tenant not found");
    }
    const tenantCode = tenant.tenantCode;
    const tables = await sequelize.query<TableInfo>(
      `
      SELECT tablename 
      FROM pg_tables
      WHERE schemaname = 'public' AND tablename LIKE '%${tenantCode}%';
      `,
      {
        type: QueryTypes.SELECT,
      },
    );

    const tenantDetails: Record<string, number> = {};

    for (const table of tables) {
      const [response] = await sequelize.query<{ total: string }>(
        `SELECT COUNT(*) AS total FROM public."${table.tablename}"`,
        { type: QueryTypes.SELECT },
      );

      tenantDetails[table.tablename.replace(`_${tenant.tenantCode}`, "")] =
        Number(response.total);
    }

    console.log(tenantDetails);

    return {
      id: tenant.id,
      tenantCode: tenant.tenantCode,
      tenantOwner: tenant.tenantOwner,
      tenantDetails,
    };
  }
  static async setupTenant(tenantOwner: string) {
    const tenant = await sequelize.transaction(
      async (transaction: Transaction) => {
        const newTenant = await Tenant.create(
          {
            tenantOwner,
          },
          { transaction },
        );
        const tenantCode = newTenant.tenantCode;
        const queryInterface = sequelize.getQueryInterface();

        const commonColums = () => ({
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.literal("gen_random_uuid()"),
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          },
        });

        const studentProfileTable = `student_profiles_${tenantCode}`;
        const teacherProfileTable = `teacher_profiles_${tenantCode}`;
        const classTable = `classes_${tenantCode}`;
        const studentsTable = `students_${tenantCode}`;
        const subjectsTable = `subjects_${tenantCode}`;
        const subject_teacherTable = `subject_teachers_${tenantCode}`;
        const attendanceSessionTable = `attendance_sessions_${tenantCode}`;
        const attendance = `student_attendance_${tenantCode}`;

        await queryInterface.createTable(
          studentProfileTable,
          {
            ...commonColums(),
            full_name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            email: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            password: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            date_of_Birth: {
              type: DataTypes.DATE,
              allowNull: false,
            },
            address: {
              type: DataTypes.STRING,
              allowNull: false,
            },
          },
          { transaction },
        );
        await queryInterface.createTable(
          teacherProfileTable,
          {
            ...commonColums(),
            full_name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            email: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            password: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            date_of_Birth: {
              type: DataTypes.DATE,

              allowNull: false,
            },
            address: {
              type: DataTypes.STRING,
              allowNull: false,
            },
          },
          { transaction },
        );

        await queryInterface.createTable(
          classTable,
          {
            ...commonColums(),
            class_name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            class_level: {
              type: DataTypes.INTEGER,
              allowNull: false,
            },
            capacity: {
              type: DataTypes.INTEGER,
              allowNull: false,
            },
            seats_available: {
              type: DataTypes.INTEGER,
              allowNull: false,
            },
          },
          { transaction },
        );
        await queryInterface.createTable(
          studentsTable,
          {
            ...commonColums(),
            student_id: {
              type: DataTypes.UUID,
              allowNull: false,
              unique: true,
              references: {
                model: studentProfileTable,
                key: "id",
              },
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            },
            class_id: {
              type: DataTypes.UUID,
              allowNull: false,
              references: {
                model: classTable,
                key: "id",
              },
              onDelete: "RESTRICT",
              onUpdate: "CASCADE",
            },
          },
          { transaction },
        );
        await queryInterface.createTable(
          subjectsTable,
          {
            ...commonColums(),
            subject_name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            subject_code: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
            },
            credit_hours: {
              type: DataTypes.INTEGER,
              allowNull: false,
            },
            class_id: {
              type: DataTypes.UUID,
              allowNull: false,
              references: {
                model: classTable,
                key: "id",
              },
              onDelete: "SET NULL",
              onUpdate: "CASCADE",
            },
          },
          { transaction },
        );
        await queryInterface.createTable(
          subject_teacherTable,
          {
            ...commonColums(),
            subject_id: {
              type: DataTypes.UUID,
              allowNull: false,
              references: {
                model: subjectsTable,
                key: "id",
              },
              onDelete: "RESTRICT",
              onUpdate: "CASCADE",
            },
            teacher_id: {
              type: DataTypes.UUID,
              allowNull: false,
              references: {
                model: teacherProfileTable,
                key: "id",
              },
              onDelete: "RESTRICT",
              onUpdate: "CASCADE",
            },
          },
          { transaction },
        );
        await queryInterface.addConstraint(subject_teacherTable, {
          fields: ["subject_id", "teacher_id"],
          type: "unique",
          name: `unique_subject_teacher_${tenantCode}`,
          transaction,
        });
        await queryInterface.createTable(attendanceSessionTable,{
          ...commonColums(),
          session_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_DATE"),
          },
          class_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: classTable,
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },

        }, { transaction });
        await queryInterface.addConstraint(attendanceSessionTable, {
          fields: ["session_date", "class_id"],
          type: "unique",
          name: `unique_session_date_class_${tenantCode}`,
          transaction,
        })
        await queryInterface.createTable(attendance,{
          ...commonColums(),
          student_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: studentProfileTable,
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          attendance_session_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: attendanceSessionTable,
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          status: {
            type: DataTypes.ENUM("present", "absent", "late", "excused"),
            allowNull: false,
            defaultValue: "absent",
          }
        },{transaction})
        await queryInterface.addConstraint(attendance, {
          fields: ["student_id", "attendance_session_id"],
          type: "unique",
          name: `unique_student_attendance_session_${tenantCode}`,
          transaction,
          
        })
        return newTenant;
      },
    );
    return tenant;
  }
}
