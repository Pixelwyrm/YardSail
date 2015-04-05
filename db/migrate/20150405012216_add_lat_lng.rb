class AddLatLng < ActiveRecord::Migration
  def change
  	add_column :posts, :lat, :decimal
  	add_column :posts, :lng, :decimal
  end
end
