class Contact < ApplicationRecord
  belongs_to :user
  validates :title,     presence: true, length: { maximum: 100 }
  validates :content,   presence: true, length: { maximum: 2000 }
  validates :remote_ip, presence: true
  validates :status,    presence: true, default: 0

  enum status: {
    not_compatible: 0,
    under_support: 1,
    supported: 2,
  }
end
