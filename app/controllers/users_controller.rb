class UsersController < ApplicationController

  def edit
  end

  def update
    user = User.find(current_user.id)
    user.update(user_params)
  end

  private
  def user_params
    params. require(:user).permit(:name, :email).merge(id: current_user.id)
  end

end
