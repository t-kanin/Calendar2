class SessionsController < ApplicationController
  skip_before_action :authenticate_user! 

  def new
  end
  
  def create 
    @user =User.find_by(email: params[:email])
    if @user.nil? 
      flash.now.alert = 'Email or password is invalid'
      render :new
    elsif @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to root_path
    else 
      flash.now.alert = 'Password is invalid'
      render :new
    end 
  end

  def destroy 
    # delete the sesion -> user no longer authenticated 
    session.delete(:user_id)
    redirect_to root_path
  end 

end
