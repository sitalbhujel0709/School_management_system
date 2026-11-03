import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import Subscription from "./Subscription.model";
import UserPayment from "./user_payment.model";
import Tenant from "./tenant.model";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @HasOne(() => Subscription, {
    foreignKey: "userId",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  declare subscription: Subscription;

  @HasMany(() => UserPayment, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  declare payments: UserPayment[];

  @HasOne(() => Tenant, {
    foreignKey: "tenantOwner",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  declare tenants: Tenant | null;
}

export default User;
