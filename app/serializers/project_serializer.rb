class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :github_link, :user_id
end
