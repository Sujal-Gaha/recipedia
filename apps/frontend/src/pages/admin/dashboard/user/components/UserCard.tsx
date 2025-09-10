import { Ban, CheckCircle, Crown, Edit, Eye, Mail, MoreHorizontal, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TGetAllUsersOutput } from '@libs/contract';

export const UserCard = ({
  user,
  isSuspending,
  suspendUser,
}: {
  user: TGetAllUsersOutput;
  isSuspending: boolean;
  suspendUser: (id: string) => void;
}) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.image || '/placeholder.svg'} alt={user.name} />
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
            {user.is_email_verified && <CheckCircle className="h-4 w-4 text-green-500" />}
            {user.user_type === 'CHEF' && <Crown className="h-4 w-4 text-amber-500" />}
          </div>
          <CardDescription>{user.email}</CardDescription>
          {/* <p className="text-sm text-muted-foreground mt-1">{user.location}</p> */}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {/* <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p> */}

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            {/* <div className="font-semibold">{user.recipesCount}</div> */}
            <div className="font-semibold">20</div>
            <div className="text-muted-foreground">Recipes</div>
          </div>
          <div className="text-center">
            {/* <div className="font-semibold">{user.followers}</div> */}
            <div className="font-semibold">20</div>

            <div className="text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            {/* <div className="font-semibold">{user.totalUpvotes}</div> */}
            <div className="font-semibold">20</div>
            <div className="text-muted-foreground">Upvotes</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Badge
              variant={user.user_type === 'CHEF' ? 'default' : user.user_type === 'ADMIN' ? 'secondary' : 'outline'}
            >
              {user.user_type}
            </Badge>
            {user.is_suspended ? (
              <Badge variant="destructive" className="bg-red-50 text-red-700 border border-red-200/50">
                Suspended
              </Badge>
            ) : null}

            {user.is_email_verified ? (
              <Badge variant="default" className="bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                Verified
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground">Joined {new Date(user.created_at).toLocaleDateString()}</span>
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

              {!user.is_suspended ? (
                <DropdownMenuItem
                  className="text-amber-600"
                  onClick={() => suspendUser(user.id)}
                  disabled={isSuspending}
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Suspend User
                </DropdownMenuItem>
              ) : null}
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
