class ItemSerializer < ActiveModel::Serializer
    attributes :id, :title, :body
end