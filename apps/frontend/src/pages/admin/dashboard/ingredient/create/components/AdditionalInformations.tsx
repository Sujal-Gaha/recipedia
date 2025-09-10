import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const AdditionalInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
        <CardDescription>Storage and preparation tips</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="storage">Storage Instructions</Label>
          <Textarea id="storage" rows={3} placeholder="How should this ingredient be stored for optimal freshness?" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preparation">Preparation Tips</Label>
          <Textarea
            id="preparation"
            rows={3}
            placeholder="Any special preparation techniques or tips for using this ingredient?"
          />
        </div>
      </CardContent>
    </Card>
  );
};
