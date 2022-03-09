class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :participants

  def participants
    self.object.users.uniq
  end
end
