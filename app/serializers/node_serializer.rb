class NodeSerializer < ActiveModel::Serializer
  attributes :id, :type, :label, :positionx, :positiony, :source, :target, :diagram_id
end
