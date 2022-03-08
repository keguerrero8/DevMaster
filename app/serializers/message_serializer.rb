class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :conversation_id
end
