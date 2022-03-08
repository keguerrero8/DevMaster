class Conversation < ApplicationRecord
    validates :title, presence: true
    has_many :messages
    has_many :users, through: :messages
end
