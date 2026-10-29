import {Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import UserPayment from "./user_payment.model";

@Table({
  tableName: "memberships",
  modelName: "Membership",
  timestamps: true
})

class Membership extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @Column({
    type: DataType.ENUM("BASIC","PRO","MAX"),
    defaultValue: "BASIC",
  })
  declare plan: "BASIC" | "PRO" | "MAX";

  @ForeignKey(()=>UserPayment)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare userPaymentId: string;
  @BelongsTo(()=>UserPayment)
  declare userPayment: UserPayment;

  @Column({
    type: DataType.ENUM("ACTIVE","INACTIVE"),
    defaultValue: "INACTIVE"
  })
  declare status: "ACTIVE" | "INACTIVE";
  
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  declare startDate: Date;
  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare endDate: Date | null;
  
}

export default Membership;