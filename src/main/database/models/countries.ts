import { DataTypes, Model, Sequelize } from 'sequelize'
import { CountryInterface } from '../../../interfaces/sharedInterfaces'

export default class Countries
  extends Model<CountryInterface, Omit<CountryInterface, 'id'>>
  implements CountryInterface
{
  id!: string
  country!: string
  active?: boolean
}

export function initCountriesModel(sequelize: Sequelize): void {
  Countries.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'countries',
      timestamps: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  )
}
