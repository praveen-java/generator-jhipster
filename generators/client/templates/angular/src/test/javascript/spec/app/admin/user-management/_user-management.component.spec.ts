<%#
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see http://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
<%_
const tsKeyId = generateTestEntityId(pkType, prodDatabaseType);
_%>
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { <%=angularXAppName%>TestModule } from '../../../test.module';
import { Principal } from '../../../../../../main/webapp/app/shared';
import { UserMgmtComponent } from '../../../../../../main/webapp/app/admin/user-management/user-management.component';
import { UserService, User } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('User Management Component', () => {
        let comp: UserMgmtComponent;
        let fixture: ComponentFixture<UserMgmtComponent>;
        let service: UserService;
        let mockPrincipal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [<%=angularXAppName%>TestModule],
                declarations: [UserMgmtComponent],
                providers: [
                    UserService
                ]
            })
            .overrideTemplate(UserMgmtComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserMgmtComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserService);
            mockPrincipal = fixture.debugElement.injector.get(Principal);
        });

        describe('OnInit', () => {
            it('Should call load all on init',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const headers = new Headers();
                        headers.append('link', 'link;link');
                        spyOn(service, 'query').and.returnValue(Observable.of({
                            json: [new User(<%- tsKeyId %>)],
                            headers
                        }));

                        // WHEN
                        comp.ngOnInit();
                        tick(); // simulate async

                        // THEN
                        expect(service.query).toHaveBeenCalled();
                        expect(comp.users[0]).toEqual(jasmine.objectContaining({id: <%- tsKeyId %>}));
                    })
                )
            );
        });

        describe('setActive', () => {
            it('Should update user and call load all',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const headers = new Headers();
                        headers.append('link', 'link;link');
                        const user = new User(<%- tsKeyId %>);
                        spyOn(service, 'query').and.returnValue(Observable.of({
                            json: [user],
                            headers
                        }));
                        spyOn(service, 'update').and.returnValue(Observable.of({ status: 200 }));

                        // WHEN
                        comp.setActive(user, true);
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(user);
                        expect(service.query).toHaveBeenCalled();
                        expect(comp.users[0]).toEqual(jasmine.objectContaining({id: <%- tsKeyId %>}));
                    })
                )
            );
        });
    });

});
