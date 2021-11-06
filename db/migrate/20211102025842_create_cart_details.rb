class CreateCartDetails < ActiveRecord::Migration[6.1]
  def change
    create_table :cart_details do |t|
      t.references :food,       null: false, foreign_key: true
      t.references :cart,                    foreign_key: true
      t.integer    :count,      null: false, default: 0

      t.timestamps
    end
  end
end
