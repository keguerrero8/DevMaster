class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :github_link
  has_many :tasks
end
