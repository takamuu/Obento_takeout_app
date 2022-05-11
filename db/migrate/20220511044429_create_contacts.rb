class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.references :user,      null: false, foreign_key: true
      t.string     :title,     null: false, length: { maximum: 100 }
      t.text       :content,   null: false, length: { maximum: 2000 }
      t.string     :remote_ip, null: false
      t.integer    :status,    null: false, default: 0

      t.timestamps
    end
  end
end
