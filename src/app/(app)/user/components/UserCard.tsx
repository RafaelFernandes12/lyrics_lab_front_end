'use client'

import { TUser } from '@/models'
import { get, logout } from '@/services/axios'
import { EditOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Card, Flex } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import { EditModal } from './EditModal'

export const UserCard = () => {
  const router = useRouter()

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await get<{ user: TUser }>('/auth/user')
      return response.user
    },
  })

  async function signOut() {
    await logout().then(() => router.push('/'))
  }

  if (!user) return <p>Falha ao carregar informações do usuário</p>

  const actions: React.ReactNode[] = [
    <EditModal key="edit" id={user.id} email={user.email} onSuccess={refetch}>
      <div className="flex w-full justify-center gap-2 hover:text-primaria">
        <EditOutlined />
        Edição
      </div>
    </EditModal>,
    <div
      key="logout"
      className="flex justify-center gap-2 hover:text-red-500"
      onClick={signOut}
    >
      <LogoutOutlined />
      Logout
    </div>,
  ]

  return (
    <Flex gap="middle" align="start" vertical>
      <Card loading={isLoading} actions={actions} style={{ minWidth: 400 }}>
        <Card.Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          }
          title={user?.name}
          description={
            <div className="flex items-center gap-2">
              <MailOutlined />
              <p className="text-primaria dark:text-primaria">{user?.email}</p>
            </div>
          }
        />
      </Card>
    </Flex>
  )
}
