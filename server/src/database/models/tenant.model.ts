import {Table,Column,Model,DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { generateTenantCode } from "../../lib/generateTenantCode";
import User from "./user.model";

@Table({
  tableName: "tenants",
  modelName: "Tenant",
  timestamps: true
})

class Tenant extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    defaultValue: ()=>generateTenantCode()
  })
  declare tenantCode: string;

  @ForeignKey(()=>User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare tenantOwner: string;

  @BelongsTo(()=>User,{
    foreignKey: "tenantOwner",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
  })
  declare user: User;
}

export default Tenant;