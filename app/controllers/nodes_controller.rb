class NodesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    def create
        diagram = Diagram.find(params[:diagram_id])
        node = diagram.nodes.create!(node_params)
        render json: node
    end

    def update
        node = Node.find_by(id: params[:id])
        node.update!(node_params)
        render json: node
    end

    def deletes
        params[:toRemove].each {|i| Node.find_by(id: i).destroy}
        head :no_content
    end

    private

    def node_params
        params.permit(:type, :label, :positionx, :positiony, :source, :target, :diagram_id)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
