const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const { upload } = require('./Upload');
require('dotenv').config({ path: './.env' })

// Models //
const Announcement = require('./Models/Announcement.js');
const Event = require('./Models/Event');
const Social = require('./Models/Social');
const LastMonth = require('./Models/LastMonth');
const AboutUs = require('./Models/AboutUs');
const AcademicStaff = require('./Models/AcademicStaff');
const Timetable = require('./Models/Timetable');
const Lesson = require('./Models/Lesson');
const User = require('./Models/User');
const Directive = require('./Models/Directive');
const Blog = require('./Models/Blog');
const CustomText = require('./Models/CustomText');
const Gallery = require('./Models/Gallery');
// Models //

async function mongooseConnect() {
    await mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
}
mongooseConnect().catch(err => console.log(err));

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/cdn', express.static('upload'))
const date = new Date();

const verifyJWT = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.json({ auth: false, message: 'No token given.' });
    } else {
        jwt.verify(token, process.env.CRYPTO_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: 'You are not authenticated.' });
            } else {
                req.userID = decoded.id;
                next();
            }
        })
    }
};

// GET Requests
app.get('/announcements', async (req, res) => {
    await Announcement.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response[0] !== undefined) {
                res.send((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse());
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/announcement/:url', async (req, res) => {
    await Announcement.findOne({ href: req.params.url }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/gallery', async (req, res) => {
    await Gallery.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response[0] !== undefined) {
                res.send((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse());
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/events', async (req, res) => {
    await Event.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response[0] !== undefined) {
                res.send((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse());
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/event/:url', async (req, res) => {
    await Event.findOne({ href: req.params.url }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/socials', async (req, res) => {
    await Social.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response[0] !== undefined) {
                res.send((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse());
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/social/:url', async (req, res) => {
    await Social.findOne({ href: req.params.url }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})


app.get('/last-month', async (req, res) => {
    await LastMonth.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response[0] !== undefined) {
                res.send((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse());
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/last-month/:url', async (req, res) => {
    await LastMonth.findOne({ href: req.params.url }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/blog', async (req, res) => {
    await Blog.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response[0] !== undefined) {
                res.send((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse());
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/blog/:url', async (req, res) => {
    await Blog.findOne({ href: req.params.url }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/custom-text', async (req, res) => {
    await CustomText.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response[0] !== undefined) {
                res.send((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse());
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/custom-text/:url', async (req, res) => {
    await CustomText.findOne({ href: req.params.url }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/administration', async (req, res) => {
    await AcademicStaff.find({ administration: true }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/timetables', async (req, res) => {
    await Timetable.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/timetable/:id', async (req, res) => {
    await Timetable.find({ _id: req.params.id }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/directives', async (req, res) => {
    await Directive.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/lessons', async (req, res) => {
    await Lesson.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/lesson/:id', async (req, res) => {
    await Lesson.find({ _id: req.params.id }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/academic-staff', async (req, res) => {
    await AcademicStaff.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/academic', async (req, res) => {
    let academicTemp = [];
    await AcademicStaff.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                academicTemp.push(response);

                Timetable.find({}, (err, response) => {
                    if (err) {
                        res.json({ message: 'An error occurred.', code: 500 });
                    } else {
                        if (response !== null) {
                            academicTemp.push(response);

                            Lesson.find({}, (err, response) => {
                                if (err) {
                                    res.json({ message: 'An error occurred.', code: 500 });
                                } else {
                                    if (response !== null) {
                                        academicTemp.push(response);
                                        res.send(academicTemp);
                                    } else {
                                        res.json({ code: 404, message: 'No data found.' });
                                    }
                                }
                            }).clone().catch(err => console.log(err));

                        } else {
                            res.json({ code: 404, message: 'No data found.' });
                        }
                    }
                }).clone().catch(err => console.log(err));

            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/main-page', async (req, res) => {
    // Nice Spaghetti
    let lastData = [];
    await Announcement.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response[0] !== undefined) {
                lastData.push((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse().slice(0, 7));
                Event.find({}, (err, response) => {
                    if (err) {
                        res.json({ message: 'An error occurred.', code: 500 });
                    } else {
                        if (response[0] !== undefined) {
                            lastData.push((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse().slice(0, 9));
                            Social.find({}, (err, response) => {
                                if (err) {
                                    res.json({ message: 'An error occurred.', code: 500 });
                                } else {
                                    if (response[0] !== undefined) {
                                        lastData.push((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse().slice(0, 9));
                                        LastMonth.find({}, (err, response) => {
                                            if (err) {
                                                res.json({ message: 'An error occurred.', code: 500 });
                                            } else {
                                                if (response[0] !== undefined) {
                                                    lastData.push((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse().slice(0, 6));
                                                    Blog.find({}, (err, response) => {
                                                        if (err) {
                                                            res.json({ message: 'An error occurred.', code: 500 });
                                                        } else {
                                                            if (response[0] !== undefined) {
                                                                lastData.push((response.sort((a, b) => { return new Date(b.date) - new Date(a.date); })).reverse().slice(0, 6));
                                                                res.send(lastData);
                                                            }
                                                        }
                                                    }).clone().catch(err => console.log(err));
                                                }
                                            }
                                        }).clone().catch(err => console.log(err));
                                    }
                                }
                            }).clone().catch(err => console.log(err));
                        }
                    }
                }).clone().catch(err => console.log(err));
            }
        }
    }).clone().catch(err => console.log(err));
})

app.get('/about-us', async (req, res) => {
    await AboutUs.findOne({ _id: '62265c02ff0a403efa4c058c' }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

// POST Requests
app.post('/isAuthenticated', verifyJWT, async (req, res) => {
    await User.findOne({ _id: req.userID }, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.json({ auth: true, message: 'You are authenticated.', userData: response });
            }
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }))
});

/* ONLY ONE REQUEST
app.post('/add-aboutus', async (req, res) => {
    AboutUs.create({
        src: req.body.src,
        index: req.body.index,
        lastUpdater: 0,
        lastUpdatedDate: date.getTime(),
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: '\'AboutUs\' successfully created.', code: 200 });
        }
    })
})
*/

app.post('/get-users', verifyJWT, async (req, res) => {
    await User.find({}, (err, response) => {
        if (err) {
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (response !== null) {
                res.send(response);
            } else {
                res.json({ code: 404, message: 'No data found.' });
            }
        }
    }).clone().catch(err => console.log(err));
})

app.post('/add-user', verifyJWT, async (req, res) => {
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        powers: req.body.powers,
        lastUpdater: req.userID,
        lastUpdatedDate: date.getTime(),
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'User successfully created.', code: 200 });
        }
    })
})

app.post('/update-user', verifyJWT, async (req, res) => {
    await User.updateOne({ _id: req.body.id }, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        powers: req.body.powers,
        lastUpdater: req.userID,
        lastUpdatedDate: date.getTime(),
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/remove-user', verifyJWT, async (req, res) => {
    await User.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/add-timetable', upload.single('file'), verifyJWT, async (req, res) => {
    await Timetable.create({
        name: req.body.name,
        src: 'http://localhost:8080/cdn/' + req.file.filename,
        lastUpdater: req.userID,
        lastUpdatedDate: date.getTime(),
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Timetable successfully created.', code: 200 });
        }
    })
})

app.post('/update-timetable', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        await Timetable.updateOne({ _id: req.body.id }, {
            name: req.body.name,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                if (err) {
                    console.log(err);
                    res.json({ message: 'An error occurred.', code: 500 });
                } else {
                    res.json({ message: 'Update succeeded.', code: 200 });
                }
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    } else {
        await Timetable.updateOne({ _id: req.body.id }, {
            name: req.body.name,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                if (err) {
                    console.log(err);
                    res.json({ message: 'An error occurred.', code: 500 });
                } else {
                    res.json({ message: 'Update succeeded.', code: 200 });
                }
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    }
})

app.post('/remove-timetable', verifyJWT, async (req, res) => {
    await Timetable.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/add-directive', upload.single('file'), verifyJWT, async (req, res) => {
    await Directive.create({
        name: req.body.name,
        src: 'http://localhost:8080/cdn/' + req.file.filename,
        lastUpdater: req.userID,
        lastUpdatedDate: date.getTime(),
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Directive successfully created.', code: 200 });
        }
    })
})

app.post('/update-directive', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        await Directive.updateOne({ _id: req.body.id }, {
            name: req.body.name,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                if (err) {
                    console.log(err);
                    res.json({ message: 'An error occurred.', code: 500 });
                } else {
                    res.json({ message: 'Update succeeded.', code: 200 });
                }
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    } else {
        await Directive.updateOne({ _id: req.body.id }, {
            name: req.body.name,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                if (err) {
                    console.log(err);
                    res.json({ message: 'An error occurred.', code: 500 });
                } else {
                    res.json({ message: 'Update succeeded.', code: 200 });
                }
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    }
})

app.post('/remove-directive', verifyJWT, async (req, res) => {
    await Directive.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/add-lesson', verifyJWT, async (req, res) => {
    await Lesson.create({
        semester: req.body.semester,
        name: req.body.name,
        theorical: req.body.theorical,
        pratical: req.body.pratical,
        credit: req.body.credit,
        akts: req.body.akts,
        lastUpdater: req.userID,
        lastUpdatedDate: date.getTime(),
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Lesson successfully created.', code: 200 });
        }
    })
})

app.post('/update-lesson', verifyJWT, async (req, res) => {
    await Lesson.updateOne({ _id: req.body.id }, {
        name: req.body.name,
        semester: req.body.semester,
        theorical: req.body.theorical,
        pratical: req.body.pratical,
        credit: req.body.credit,
        akts: req.body.akts,
        lastUpdater: req.userID,
        lastUpdatedDate: date.getTime(),
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Update succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/remove-lesson', verifyJWT, async (req, res) => {
    await Lesson.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/update-about-us', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        await AboutUs.updateOne({ _id: '62265c02ff0a403efa4c058c' }, {
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    } else {
        await AboutUs.updateOne({ _id: '62265c02ff0a403efa4c058c' }, {
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    }
})

app.post('/add-announcement', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        res.json({ message: 'Image needed.', code: 0 });
    } else {
        await Announcement.create({
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            headline: req.body.headline,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Announcement successfully created.', code: 200 });
            }
        })
    }
})

app.post('/update-announcement', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        await Announcement.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            headline: req.body.headline,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    } else {
        await Announcement.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            headline: req.body.headline,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    }
})

app.post('/remove-announcement', verifyJWT, async (req, res) => {
    await Announcement.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/add-event', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        res.json({ message: 'Image needed.', code: 0 });
    } else {
        await Event.create({
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Event successfully created.', code: 200 });
            }
        })
    }
})

app.post('/update-event', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        await Event.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    } else {
        await Event.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    }
})

app.post('/remove-event', verifyJWT, async (req, res) => {
    await Event.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/add-social', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        res.json({ message: 'Image needed.', code: 0 });
    } else {
        await Social.create({
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Social successfully created.', code: 200 });
            }
        })
    }
})

app.post('/update-social', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        await Social.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    } else {
        await Social.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    }
})

app.post('/remove-social', verifyJWT, async (req, res) => {
    await Social.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/add-blog-post', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        res.json({ message: 'Image needed.', code: 0 });
    } else {
        await Blog.create({
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            desc: req.body.desc,
            headline: req.body.headline,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Blog post successfully created.', code: 200 });
            }
        })
    }
})

app.post('/update-blog-post', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        await Blog.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    } else {
        await Blog.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            desc: req.body.desc,
            headline: req.body.headline,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    }
})

app.post('/remove-blog-post', verifyJWT, async (req, res) => {
    await Blog.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/add-custom-text', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        res.json({ message: 'Image needed.', code: 0 });
    } else {
        await CustomText.create({
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            desc: req.body.desc,
            headline: req.body.headline,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Blog post successfully created.', code: 200 });
            }
        })
    }
})

app.post('/update-custom-text', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        await CustomText.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    } else {
        await CustomText.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            desc: req.body.desc,
            headline: req.body.headline,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    }
})

app.post('/remove-custom-text', verifyJWT, async (req, res) => {
    await CustomText.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/add-last-month', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        res.json({ message: 'Image needed.', code: 0 });
    } else {
        await LastMonth.create({
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Last month post successfully created.', code: 200 });
            }
        })
    }
})

app.post('/update-last-month', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        await LastMonth.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    } else {
        await LastMonth.updateOne({ _id: req.body.id }, {
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            headline: req.body.headline,
            desc: req.body.desc,
            index: req.body.index,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    }
})

app.post('/remove-last-month', verifyJWT, async (req, res) => {
    await LastMonth.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})


app.post('/add-academic-staff', upload.single('file'), verifyJWT, async (req, res) => {
    await AcademicStaff.create({
        name: req.body.name,
        role: req.body.role,
        href: req.body.href,
        src: 'http://localhost:8080/cdn/' + req.file.filename,
        desc: req.body.desc,
        bb: (req.body.bb === 'true' ? true : false),
        administration: (req.body.administration === 'true' ? true : false),
        lastUpdater: req.userID,
        lastUpdatedDate: date.getTime(),
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Academic staff successfully created.', code: 200 });
        }
    })
})

app.post('/update-academic-staff', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        await AcademicStaff.updateOne({ _id: req.body.id }, {
            name: req.body.name,
            role: req.body.role,
            href: req.body.href,
            desc: req.body.desc,
            bb: (req.body.bb === 'true' ? true : false),
            administration: (req.body.administration === 'true' ? true : false),
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Update succeeded.', code: 200 });
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    } else {
        await AcademicStaff.updateOne({ _id: req.body.id }, {
            name: req.body.name,
            role: req.body.role,
            href: req.body.href,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            desc: req.body.desc,
            bb: (req.body.bb === 'true' ? true : false),
            administration: (req.body.administration === 'true' ? true : false),
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                if (err) {
                    console.log(err);
                    res.json({ message: 'An error occurred.', code: 500 });
                } else {
                    res.json({ message: 'Update succeeded.', code: 200 });
                }
            }
        }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
    }
})

app.post('/remove-academic-staff', verifyJWT, async (req, res) => {
    await AcademicStaff.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/add-image', upload.single('file'), verifyJWT, async (req, res) => {
    if (!req.file) {
        res.json({ message: 'Image needed.', code: 0 });
    } else {
        await Gallery.create({
            name: req.body.name,
            src: 'http://localhost:8080/cdn/' + req.file.filename,
            desc: req.body.desc,
            lastUpdater: req.userID,
            lastUpdatedDate: date.getTime(),
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ message: 'An error occurred.', code: 500 });
            } else {
                res.json({ message: 'Blog post successfully created.', code: 200 });
            }
        })
    }
})

app.post('/remove-image', verifyJWT, async (req, res) => {
    await Gallery.deleteOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ message: 'An error occurred.', code: 500 });
        } else {
            res.json({ message: 'Delete succeeded.', code: 200 });
        }
    }).clone().catch(err => res.json({ message: 'An error occurred.', code: 500 }));
})

app.post('/login', async (req, res) => {
    await User.findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
        if (err) { console.log(err); res.json({ message: 'An error occurred.', code: 500 }); } else {
            if (data !== null) {
                let id = data._id;
                res.json({ message: 'Access Granted', token: jwt.sign({ id }, process.env.CRYPTO_KEY, { expiresIn: 60 * 60 * 24 * 30, }), auth: true });
            } else {
                res.json({ message: 'Access Denied', auth: false });
            }
        }
    }).clone().catch(err => res.json({ message: 'Cannot reach to DB server.', auth: false }));
});

app.listen(process.env.API_PORT, () => console.log(`API is running on port ${process.env.API_PORT}`));