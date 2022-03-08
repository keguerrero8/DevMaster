class Message < ApplicationRecord
    belongs_to :user
    belongs_to :conversation
    validates :conversation_id, uniqueness: {scope: :user_id, message: "User has already been invited to this conversation"} 
end
