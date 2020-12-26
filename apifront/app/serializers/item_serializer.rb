class ItemSerializer < ActiveModel::Serializers
    attributes :id, :title, :body
end