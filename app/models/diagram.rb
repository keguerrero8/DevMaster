class Diagram < ApplicationRecord
    has_many :nodes, dependent: :destroy
    has_many :user_diagrams
    has_many :users, through: :user_diagrams
end
