class GroupsController < ApplicationController

  def new
    @group = Group.new
    @users = User.all
    @group.users << current_user
  end

  def create

  end

  def edit
  end

  def update
  end

end
