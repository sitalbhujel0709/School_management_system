import {Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "subscriptions",
  modelName: "Subscription",
  timestamps: true
})

class Subscription extends Model {
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

  @ForeignKey(()=>User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare userId: string;
  

  @Column({
    type: DataType.ENUM("ACTIVE","INACTIVE","CANCELLED"),
    defaultValue: "INACTIVE"
  })
  declare status: "ACTIVE" | "INACTIVE" | "CANCELLED";
  
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  declare startDate: Date;
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null
  })
  declare endDate: Date | null;
  @BelongsTo(()=>User,{
    foreignKey: "userId",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
  })
  declare user: User;
}

export default Subscription;