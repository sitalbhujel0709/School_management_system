import {Table,Model,Column,DataType} from "sequelize-typescript";

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
}

export default User;