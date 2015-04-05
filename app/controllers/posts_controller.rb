class PostsController < ApplicationController
	def index
		@post = Post.new
	end

	def create
		@post = Post.new(post_params)

		if @post.save
		redirect_to root_url
		end
	end

	def post_params
      params.require(:post).permit(:user_id, :title, :action, :category, :desc, :pic, :price, :lat, :lng)
    end
end
