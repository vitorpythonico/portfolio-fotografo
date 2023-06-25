"""TokenBlockList model added

Revision ID: aba1a2a611da
Revises: 4b8f43e28659
Create Date: 2023-06-21 14:28:36.663583

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'aba1a2a611da'
down_revision = '4b8f43e28659'
branch_labels = None
depends_on = None

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tokens',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('jti', sa.String(length=36), nullable=False),
    sa.Column('token_type', sa.String(length=10), nullable=True),
    sa.Column('revoked_at', sa.DateTime(), nullable=True),
    sa.Column('expires', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('jti')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tokens')
    # ### end Alembic commands ###
