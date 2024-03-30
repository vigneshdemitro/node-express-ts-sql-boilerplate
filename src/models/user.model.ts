import { DataTypes, Model } from "sequelize";
import { sequelize } from "./database";
import { Gender, UserRole } from "./enum";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    gender: Gender;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: UserRole;
    public gender!: Gender;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        role: {
            allowNull: false,
            type: DataTypes.ENUM(UserRole.ADMIN, UserRole.USER),
            defaultValue: UserRole.USER,
        },
        gender: {
            allowNull: true,
            type: DataTypes.ENUM(Gender.MALE, Gender.FEMALE),
            defaultValue: null,
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'User',
        tableName: 'users',
    }
);

export { User }