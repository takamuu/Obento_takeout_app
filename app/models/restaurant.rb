class Restaurant < ApplicationRecord
  has_many :foods, dependent: :destroy

  validates :name,           presence: true, uniqueness: true, length: { maximum: 30 }
  validates :fee,            presence: true, numericality: { greater_than: 0 }
  validates :postal_code,    presence: true
  validates :prefecture,     presence: true
  validates :city,           presence: true
  validates :block_building, presence: true
  validates :phone_number,   presence: true
  validates :update_time,    presence: true
end
