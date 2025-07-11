import { DataTypes, Model, Sequelize } from 'sequelize'
import { NationalityInterface } from '../../../interfaces/sharedInterfaces'

export default class Nationality
  extends Model<NationalityInterface, Omit<NationalityInterface, 'id'>>
  implements NationalityInterface
{
  public id!: string
  public nationality!: string
}

export function initNationalityModel(sequelize: Sequelize): void {
  Nationality.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      nationality: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'nationalities',
      timestamps: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  )
}
