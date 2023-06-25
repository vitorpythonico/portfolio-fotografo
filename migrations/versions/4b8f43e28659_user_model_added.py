"""User model added

Revision ID: 4b8f43e28659
Revises: 
Create Date: 2023-06-20 11:08:58.992327

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '4b8f43e28659'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
		# ### commands auto generated by Alembic - please adjust! ###
		op.create_table('users',
			sa.Column('id', sa.Integer(), nullable=False),
			sa.Column('username', sa.String(length=64), nullable=True),
			sa.Column('password', sa.String(length=64), nullable=True),
			sa.PrimaryKeyConstraint('id'),
			sa.UniqueConstraint('username')
		)
		with op.batch_alter_table('photos', schema=None) as batch_op:
			batch_op.alter_column('description',
			existing_type=sa.VARCHAR(length=150),
			type_=sa.String(length=200),
			existing_nullable=True)

	    # ### end Alembic commands ###

def downgrade():
		# ### commands auto generated by Alembic - please adjust! ###
		with op.batch_alter_table('photos', schema=None) as batch_op:
			batch_op.alter_column('description',
			existing_type=sa.String(length=200),
			type_=sa.VARCHAR(length=150),
			existing_nullable=True)

		op.drop_table('users')
		# ### end Alembic commands ###
