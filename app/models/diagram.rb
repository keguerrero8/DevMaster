class Diagram < ApplicationRecord
    has_many :nodes, dependent: :destroy
    belongs_to :user
end
