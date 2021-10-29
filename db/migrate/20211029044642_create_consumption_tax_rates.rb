class CreateConsumptionTaxRates < ActiveRecord::Migration[6.1]
  def change
    create_table :consumption_tax_rates do |t|
      t.integer :tax_classification,    null: false
      t.integer :adaptation_start_date, null: false
      t.integer :adaptation_end_date
      t.integer :tax_rate,              null: false

      t.timestamps
    end
  end
end
