class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :avatar, :github_username
end
