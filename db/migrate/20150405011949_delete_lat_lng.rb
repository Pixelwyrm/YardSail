class DeleteLatLng < ActiveRecord::Migration
  def change
  	remove_column :posts, :lat
  	remove_column :posts, :lng
  end
end
