import { Ban, CheckCircle, Crown, Edit, Eye, Mail, MoreHorizontal, Trash2, UserCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { IUser } from '../types/user';
import { Badge } from '../../../../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../../components/ui/dropdown-menu';
import { Button } from '../../../../../components/ui/button';
import { Link } from 'react-router-dom';

export const UserCard = ({
  user,
  handleVerifyUser,
  handleActivateUser,
  handleSuspendUser,
}: {
  user: IUser;
  handleVerifyUser: (user: IUser) => void;
  handleSuspendUser: (user: IUser) => void;
  handleActivateUser: (user: IUser) => void;
}) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg">{user.name}</CardTitle>
            {user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
            {user.role === 'chef' && <Crown className="h-4 w-4 text-amber-500" />}
          </div>
          <CardDescription>{user.email}</CardDescription>
          <p className="text-sm text-muted-foreground mt-1">{user.location}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold">{user.recipesCount}</div>
            <div className="text-muted-foreground">Recipes</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{user.followers}</div>
            <div className="text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{user.totalUpvotes}</div>
            <div className="text-muted-foreground">Upvotes</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Badge variant={user.role === 'chef' ? 'default' : user.role === 'moderator' ? 'secondary' : 'outline'}>
              {user.role}
            </Badge>
            <Badge
              variant={user.status === 'active' ? 'default' : 'destructive'}
              className={
                user.status === 'active'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                  : 'bg-red-50 text-red-700 border border-red-200/50'
              }
            >
              {user.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground">Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/profile/${user.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </DropdownMenuItem>
              {!user.verified && user.status === 'active' && (
                <DropdownMenuItem className="text-blue-600" onClick={() => handleVerifyUser(user)}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify User
                </DropdownMenuItem>
              )}
              {user.status === 'active' ? (
                <DropdownMenuItem className="text-amber-600" onClick={() => handleSuspendUser(user)}>
                  <Ban className="mr-2 h-4 w-4" />
                  Suspend User
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="text-emerald-600" onClick={() => handleActivateUser(user)}>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Activate User
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </CardContent>
  </Card>
);
