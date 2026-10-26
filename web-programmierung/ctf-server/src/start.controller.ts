import { All, Controller, Param, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { fail, resource, solved } from './reply';
import { createTeam, findTeam } from './team';

// Start und Level 0: Team anlegen (Einheit 3)
@Controller()
export class StartController {
  @All()
  root(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => res.json({ message: 'Capture the Flag. Start: GET /ctf' }),
    });
  }

  // Level 0: Body lesen, dann ein Team anlegen
  @All('ctf')
  start(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () =>
        res.json({
          level: 0,
          message:
            'Willkommen im Brauhaus. Jedes Level ist ein Rätsel aus mehreren Anfragen und belohnt die Lösung mit einem Flag.',
          rules: [
            'Lies den Statuscode.',
            'Lies die Header.',
            'Lies den Body.',
            'Erst dann ändere die Anfrage.',
          ],
          start:
            'Ein Team braucht ein Token. Lege dein Team mit POST /ctf/teams an.',
        }),
    });
  }

  @All('ctf/teams')
  teams(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      POST: () => {
        const { token, team } = createTeam();
        res.set('Location', `/ctf/teams/${token}`);
        solved(
          res,
          0,
          team,
          {
            message:
              'Team angelegt. Sende das Token ab jetzt in jeder Anfrage im Header X-Team.',
            token,
          },
          201,
        );
      },
    });
  }

  @All('ctf/teams/:token')
  team(
    @Param('token') token: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    resource(req, res, {
      GET: () => {
        const team = findTeam(token);
        if (!team) {
          return fail(res, 404, 'Not Found', 'Dieses Team gibt es nicht.');
        }
        res.json({
          team: team.id,
          solved: [...team.solved].sort((a, b) => a - b),
        });
      },
    });
  }
}
