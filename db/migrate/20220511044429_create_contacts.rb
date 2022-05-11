class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.integer :user_id
      t.string :title
      t.text :content
      t.string :remote_ip
      t.integer :status

      t.timestamps
    end
  end
end
