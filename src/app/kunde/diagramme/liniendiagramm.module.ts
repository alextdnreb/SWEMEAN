/*BILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { HttpClientModule } from '@angular/common/http';
import { LiniendiagrammComponent } from './liniendiagramm.component';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [LiniendiagrammComponent],
    exports: [LiniendiagrammComponent],
    imports: [HttpClientModule],
    providers: [Title],
})
export class LiniendiagrammModule {}
