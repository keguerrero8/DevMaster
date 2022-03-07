class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    has_many :user_diagrams
    has_many :diagrams, through: :user_diagrams
    has_many :user_projects
    has_many :projects, through: :user_projects
end
