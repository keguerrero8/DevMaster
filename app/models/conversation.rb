class Conversation < ApplicationRecord
    validates :title, presence: true
    has_many :messages, dependent: :destroy 
    has_many :users, through: :messages
end
