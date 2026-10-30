import {Table,Model,Column,DataType, HasOne, HasMany} from "sequelize-typescript";
import Subscription from "./Subscription.model";
import UserPayment from "./user_payment.model";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true
})

class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare username: string;
  
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  declare email: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare password: string;

  @HasOne(()=>Subscription)
  declare subscription: Subscription;

  @HasMany(()=>UserPayment)
  declare payments: UserPayment[];
}

export default User;