class TaskSerializer < ActiveModel::Serializer
  attributes :id, :content, :project_id, :status, :order
end
