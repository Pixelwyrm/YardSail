class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :events

  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable

  validates :email, uniqueness: { case_sensitive: false }, presence: true
  validates_format_of :email, :with => /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/

  def email_verified?
    self.email && self.email !~ TEMP_EMAIL_REGEX
  end
end
