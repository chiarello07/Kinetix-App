import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function UsersTab() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      let query = supabase.from('profiles').select('*').order('created_at', { ascending: false })
      const { data } = await query.limit(50)

      if (data && data.length > 0) {
        const userIds = data.map((u) => u.id)
        const { data: nutProf } = await supabase
          .from('nutrition_profiles')
          .select('user_id, primary_goal, gender')
          .in('user_id', userIds)

        const merged = data.map((u) => {
          const np = nutProf?.find((n) => n.user_id === u.id)
          return { ...u, ...np }
        })

        const filtered = merged.filter(
          (u) =>
            !search || u.id.includes(search) || (u.primary_goal && u.primary_goal.includes(search)),
        )
        setUsers(filtered)
      } else {
        setUsers([])
      }
      setLoading(false)
    }
    fetchUsers()
  }, [search])

  return (
    <div className="flex flex-col h-full space-y-4 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Usuários</h2>
        <p className="text-muted-foreground">Visão 360º dos assinantes e trials.</p>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Buscar por ID ou objetivo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-md flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Objetivo</TableHead>
              <TableHead>Data Cadastro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">{user.id.substring(0, 8)}...</TableCell>
                  <TableCell>
                    {user.is_premium ? (
                      <Badge className="bg-amber-500 hover:bg-amber-600">Premium</Badge>
                    ) : user.trial_started_at ? (
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Trial
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Free</Badge>
                    )}
                  </TableCell>
                  <TableCell className="capitalize">
                    {user.primary_goal?.replace('_', ' ') || '-'}
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" title="Ver Detalhes">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Detalhes do Usuário</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>ID:</strong> {user.id}
                          </p>
                          <p>
                            <strong>Status:</strong> {user.is_premium ? 'Premium' : 'Free/Trial'}
                          </p>
                          <p>
                            <strong>Objetivo:</strong> {user.primary_goal || 'Não definido'}
                          </p>
                          <p>
                            <strong>Gênero:</strong> {user.gender || 'Não definido'}
                          </p>
                          <p>
                            <strong>Última Atividade:</strong>{' '}
                            {user.last_activity_at
                              ? new Date(user.last_activity_at).toLocaleString('pt-BR')
                              : '-'}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
