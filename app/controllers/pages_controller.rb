class PagesController < ApplicationController
	def index
	end

	def post
	end

	def landing
		if(user_signed_in?)
			redirect_to pages_post_path
		end
	end
end
