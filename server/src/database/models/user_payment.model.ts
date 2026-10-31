import {Model,Table,Column,DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "user_payments",
  modelName: "UserPayment",
  timestamps: true
})

class UserPayment extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey:true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @ForeignKey(()=>User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare userId: string;
  @BelongsTo(()=>User)
  declare user: User;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  declare amount: number;

  @Column({
    type: DataType.ENUM("USD","NRP"),
    allowNull: false,
    defaultValue: "NRP"
  })
  declare currency: "USD" | "NRP";
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare transactionId: string;
  @Column({
    type: DataType.ENUM("PENDING","COMPLETED","FAILED"),
    allowNull: false,
    defaultValue: "PENDING"
  })
  declare status: "PENDING" | "COMPLETED" | "FAILED";
}

export default UserPayment;