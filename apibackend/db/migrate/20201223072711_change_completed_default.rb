class ChangeCompletedDefault < ActiveRecord::Migration[6.0]
  def change
    change_column :items, :completed, :boolean, :default => false 
  end
end
