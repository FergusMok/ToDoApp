module Api
    module V1
        class ItemsController < ApplicationController
            #include CurrentUserConcern

            #before_action :set_current_user, only: [:showOnlyUserItems]

            def index
                @items = Item.order('created_at DESC');
                render json: {status: 'Sucessful!', message:"Loaded all the to-do items!", data: @items}, status: :ok
            end

            def show
                @items = Item.find(params[:id])
                render json: {status: 'Sucessful!', message:"Loaded my to-do item", data: @items}, status: :ok
            end

            def create
                @items = Item.new(items_params)
                @items.user = User.find(@items.user_id)
                if @items.save
                    render json: {status: 'Sucessful!', message:"Successfully posted my to-do item", 
                        data: @items}, status: :ok
                else
                    render json: {status: 'Unsucessful!', message:"Was not able to post my to-do item", 
                        data: @items.errors}, status: :unprocessable_entity
                end
            end
            
            def update
                @items = Item.find(params[:id])
                if @items.update_attributes(items_params)
                    render json: {status: 'Sucessful!', message:"Successfully updated my to-do item", data: @items}, status: :ok
                else
                    render json: {status: 'Unsucessful!', message:"Was not able to update my to-do item", data: @items.errors}, status: :unprocessable_entity
                end
            end

            def destroy
                @items = Item.find(params[:id])
                @items.destroy
                render json: {status: 'Sucessful!', message:"Deleted my item", data: @items}, status: :ok
            end
            
            def showCompletedTags
                @items = Item.where(completed:true).tag_counts.map(&:name)
                render json: {status: 'Sucessful!', message:"Successfully showed all completed items", data: @items}, status: :ok
            end

            def showIncompletedTags
                @items = Item.where(completed:false).tag_counts.map(&:name)
                render json: {status: 'Sucessful!', message:"Successfully showed all incompleted items", data: @items}, status: :ok
            end

            def emailUsers
                User.find_each do |user|
                    UserMailer.due_date_chaser(user).deliver_now
                end
                render json: {status: 'Sucessful!', message:"Emailed myself"}, status: :ok
            end

            private
            def items_params
                return params.require(:item).permit(:title, :body, :completed, :user_id, :tag_list, :due_date)
            end
        end
    end
end