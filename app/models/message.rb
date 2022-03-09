class Message < ApplicationRecord
    belongs_to :user
    belongs_to :conversation
    # validates :user_id, uniqueness: {scope: :conversation_id, message: "User has already been invited to this conversation"} 
end
